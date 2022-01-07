const express = require("express");
const router = express.Router();
const User = require("../models/users");
const schedule = require("node-schedule");
const Set = require("../models/sets");
const Activity = require("../models/activities");
const setName = require("../models/setNames");
const cookieParser = require("cookie-parser");
const isAuth = require("../config/isAuth");
const sendMail = require("../config/sendMail");
const filter = require("../config/filter");
const stripe = require('stripe')(process.env.SECRET_KEY_TEST);
router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
let update;
let sendRemainder;
router.route("/signup").post(async (req, res, next) => {
  try {
    let user = new User(req.body);
    let token = await user.createAuthToken();
    schedule.scheduleJob('plan-days','0 0 0 * * *',async ()=>{
      console.log('Minus');
        user.remainingDays--;
        await user.save();
    })
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 5000000000),
      httpOnly: true,
    });
    res.redirect("/user/dashboard");
  } catch (err) {
    next(err);
  }
});

router.route("/dashboard").get(isAuth, async (req, res, next) => {
  try {
    let user = req.user;
    // console.log(user);
    res.render("dashboard", user);
  } catch (err) {
    next(err);
  }
});

router.route("/dashboard/profile").get(isAuth, async (req, res, next) => {
  try {
    // sendMail(req.user.email, { name: "Activity1" }, 50);
    res.render("profile", { user: req.user });
  } catch (err) {}
});
router.route("/update").post(isAuth, async (req, res, next) => {
  try {
    let newUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    // console.log(newUser);
    await newUser.save();
    res.send({ status: "Done" });
  } catch (err) {
    next(err);
  }
});
router
  .route("/dashboard/activityProgress")
  .post(isAuth, async (req, res, next) => {
    try {
      let user = await User.findById(req.user._id).populate("activities");
      console.log(req.body);
      let ac = user.activities;
      console.log(ac);
      for (let i = 0; i < ac.length; i++) {
        if (ac[i].activity.toString() === req.body.id) {
          ac[i].progress = req.body.value;
          break;
        }
      }
      user.activities = ac;
      await user.save();
      res.send({ status: "Done" });
    } catch (err) {
      next(err);
    }
  });
router.route("/dashboard/reminder").post(isAuth, async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.route("/dashboard/sendMail").post(isAuth, async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id).populate("activities");
    console.log(req.body);
    user.activity.remainderTime=req.body.time;
    await user.save();
    let ac = user.activities;
    console.log(ac);
    for (let i = 0; i < ac.length; i++) {
      if (ac[i].activity.toString() === req.body.id) {
        // console.log('Hi');
        ac[i].remainder = req.body.time;
        let string = "*/"+req.body.time+ " * * * * *";
        // console.log(string);
        let x = await Activity.findById(ac[i].activity.toString(), "name");
        let jobName = "remainder" + ac[i].activity.toString();
        string = "*/" + req.body.time + " * * * * *";
        console.log(string);
        schedule.scheduleJob(jobName, string, () => {
          sendMail(req.user.email,x.name).catch(console.error);
          // console.log('Send Mail');
        });
        break;
      }
    }
    res.send({ status: "Done" });
  } catch (err) {
    next(err);
  }
});
router.route("/dashboard/cancelMail").post(isAuth, async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id).populate("activities");
    user.activity.remainderTime=0;
    await user.save();
    let ac = user.activities;
    for (let i = 0; i < ac.length; i++) {
      if (ac[i].activity.toString() === req.body.id) {
        ac[i].remainder = req.body.time;
        let jobName = "remainder" + ac[i].activity.toString();
        let job = schedule.scheduledJobs[jobName];
        if (job) {
          job.cancel();
        }
        break;
      }
    }
    res.send({ status: "Done" });
  } catch (err) {
    next(err);
  }
});
router.route("/info").get(isAuth, async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id,['name','docter','description','count']).populate({
      path: "activities",
      populate: { path: "activity", populate: "docter" },
    });
    user.activities.forEach((element) => {
      filter(element.activity.docter);
    });
    let set;
    if(user.set)
    {
      set = await Set.findById(user.set._id);
      
    }
    res.send({ user, set });
  } catch (err) {
    next(err);
  }
});
router
  .route("/dashboard/form")
  .get(isAuth, async (req, res, next) => {
    try {
      let arr = new Array();
      let x = await setName.find({});
      arr = await Set.find({}, "name");
      // console.log(arr);
      res.render("form", { array: arr, name: req.user.name, x });
    } catch (err) {
      next(err);
    }
  })
  .post(isAuth, async (req, res, next) => {
    try {
      let userSet=req.body;
      include=false;
      let set=await Set.find({bmi:{start:{$lte:req.body.bmi},end:{$gte:req.body.bmi}},BOD:{start:{$lte:req.body.BOD},end:{$gte:req.body.BOD}},workoutTime:{start:{$lte:req.body.workoutTime},end:{$gte:req.body.workoutTime}},
        cholesterol:{start:{$lte:req.body.cholesterol},end:{$gte:req.body.cholesterol}},bloodPreasure:{start:{$lte:req.body.bloodPreasure},end:{$gte:req.body.bloodPreasure}},addiction:req.body.addiction});
      let user = await User.findById(req.user._id);
      user.set = set._id;
      let arr = new Array();
      set.activity.forEach((item) => {
        arr.push({
          activity: item._id,
          progress: 0,
          remainder: 0,
        });
      });
      user.activities = arr;
      await user.save();
      res.send({ status: "Done" });
    } catch (err) {
      next(err);
    }
  });
router.route("/login").post(async (req, res, next) => {
  try {
    const user = req.body;
    const found = await User.findOne({
      email: user.email,
      password: user.password,
    });
    if (found) {
      let x = 1;
      let token = await found.createAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 5000000000),
        httpOnly: true,
      });
     
      res.send({ status: "done" });
    } else {
      let error = new Error("Enter Valid Credantials");
    }
  } catch (err) {
    err.status = 403;
    next(err);
  }
});
router.route("/signout").post(isAuth, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    let z = schedule.scheduledJobs["job-1"];
    if (z) {
      z.cancel();
    }
    await req.user.save();
    res.send({ status: "done" });
  } catch (err) {
    next(err);
  }
});

//Payments
router.route("/dashboard/payment").get(isAuth, async (req, res, next) => {
  try {
    res.render("payment", { name: req.user.name });
  } catch (err) {
    next(err);
  }
});
router
  .route("/pay")
  .get(isAuth, async (req, res, next) => {
      console.log(req.query.plan);
    res.render("pay", { key: process.env.PUBLISHABLE_KEY,plan:req.query.plan });
  })
  .post(isAuth, async (req, res, next) => {
    console.log(req.body);
    stripe.charges
      .create({
        source: req.body.stripeTokenId,
        amount: req.body.amount, // Charing Rs 25
        currency: "INR",
      })
      .then(async (charge) => {
        const user=await User.findById(req.user._id);
        user.plan=req.query.plan;
        if(req.query.plan=='basic')
        {
          user.remainingDays=60;
        }
        else{
          user.remainingDays=180;
        }
        await user.save();
        res.send(charge); // If no error occurs
      })
      .catch((err) => {
        res.send(err); // If some error occurs
      });
  });
module.exports = router;
