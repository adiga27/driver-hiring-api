const express = require("express");
const router = express.Router();
const Jobs = require("../models/jobModel");

// const users = require("../data.json");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const filters = req.query;

    const startPage = (page - 1) * limit;
    const endPage = page * limit;

    let results = {};
    const jobs = await Jobs.find();

    let filteredJob;
    if (filters.place || filters.price) {
      const place =
        filters.place[0].toUpperCase() +
        filters.place.slice(1, filters.place.length);
      const price = parseInt(filters.price);
      filteredJob = jobs.filter((driver) => {
        if (place && price) {
          if (driver.place === place && driver.price <= price) {
            return driver;
          }
        } else if (place) {
          if (driver.place === place) {
            return driver;
          }
        } else if (price) {
          if (driver.price <= price) {
            return driver;
          }
        }
        return;
      });
    }

    if (endPage < filteredJob.length) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startPage > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    results.results = filteredJob.slice(startPage, endPage);

    // const filteredUsers = results.results.filter((driver) => {
    //   for (key in filters) {
    //     console.log(key, driver[key], filters[key]);
    //     isValid = isValid && driver[key] == filters[key];
    //   }
    //   return isValid;
    // });
    // res.send(filteredUsers);

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getJobs, (req, res) => {
  res.send(res.job);
});

router.post("/", async (req, res) => {
  try {
    const newJob = await Jobs.create(req.body);
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getJobs, async (req, res) => {
  try {
    const updateJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updateJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getJobs, async (req, res) => {
  try {
    await res.job.deleteOne();
    res.json({ message: "Deleted driver successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getJobs(req, res, next) {
  let job;
  try {
    job = await Jobs.findById(req.params.id);
    if (job === null)
      return res.status(404).json({ message: "Cannot find driver" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.job = job;
  next();
}

module.exports = router;
