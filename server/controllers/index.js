const models = require("../models");

//models
const Issue = models.Issue.IssueModel;
const Collaborator = models.Collaborator.IssueModel;
const Mentor = models.Mentor.IssueModel;

//TO SOLVE MONGO PROBLEM??:
// default fake data so that we have something to work with until issue is made
const defaultData = {
  Name: "unknown",
  issue_id: 0,
  createdDate: null,
  Description: "",
};

// object for us to keep track
let lastAdded = new Issue(defaultData);

// function to find all the issues on request.
const readAllIssues = (req, res, callback) => {
  //use built in find function to get all issues
  Issue.find(callback).lean();
};

const readAllCollaborators = (req, res, callback) => {
  //use built in find function to get all collaborators
  Collaborator.find(callback).lean();
};

// function to find a specific issue on request.
const readIssue = (req, res) => {
  const name = req.query.name;

  // function to call when we get objects back from the db.
  const callback = (err, doc) => {
    if (err) {
      return res.status(500).json({ err }); // if error, return it
    }

    // return success
    return res.json(doc);
  };

  // Call the function in IssueModels defined in the Schema in the Model file
  //(findByName function in the model file)
  Issue.findByName(name, callback);
};
//the index page

const hostIndex = (req, res) => {
  // res.render takes a name of a page to render.
  res.render("index", {
    title: "Home",
    pageName: "Home Page",
  });
};

//the 1st page
const hostPage1 = (req, res) => {
  // function to call when we get objects back from the database.
  // With Mongoose's find functions, you will get an err and doc(s) back
  const callback = (err, docs) => {
    if (err) {
      return res.status(500).json({ err }); // if error, return it
    }

    // return success
    return res.render("page1", { issues: docs });
  };

  readAllIssues(req, res, callback);
};

//page2
const hostPage2 = (req, res) => {
  // page of inserting issues
  res.render("page2");
};

// page3
const hostPage3 = (req, res) => {
  // page to seach for issues
  res.render("page3");
};

//page 4
const hostPage4 = (req, res) => {
  // page 4 to get list of all collaborators
  const callback = (err, docs) => {
    if (err) {
      return res.status(500).json({ err }); // if error, return it
    }

    // return success
    return res.render("page4", { issues: docs });
  };

  readAllCollaborators(req, res, callback);
};

// function to handle get request to send the name
// and a pre-filled out response object to send
const getName = (req, res) => {
  res.json({ name: lastAdded.name });
};

const setIssue = (req, res) => {
  // check if the required fields exist
  //THIS IS THE PLACE WHERE VALIDATION FAILS IN MONGO??
  if (!req.body.issue_id || !req.body.Name) {
    // if not give 400 error

    return res
      .status(400)
      .json({ error: "issue id,name for issue are required" });
  }

  // if required fields are good, then set name
  const name = `${req.body.Name}`;

  // dummy JSON to insert into database
  const IssueData = {
    name,
    issueId: req.body.issue_id,
    description: req.body.Description,
    createdDate: req.body.CreatedDate,
    //Default status will be open unless mentor sets it
  };

  // create a new object of IssueModel
  const newIssue = new Issue(IssueData);

  // create new save promise for the database
  const savePromise = newIssue.save();

  savePromise.then(() => {
    // set the lastAdded issue to our newest object.
    // This way we can update it dynamically
    lastAdded = newIssue;
    // return success
    res.json({
      name: lastAdded.name,
      issueId: req.body.issue_id,
      description: req.body.Description,
      createdDate: req.body.CreatedDate,
    });
  });

  // if error, return it
  savePromise.catch((err) => res.status(500).json({ err }));

  return res;
};

const searchIssue = (req, res) => {
  //to search for an issue
  if (!req.query.name) {
    return res
      .status(400)
      .json({ error: "Name is required to perform a search" });
  }

  // Call issue findByName function.
  // Since this is a static function, no need of creating an object
  return Issue.findByName(req.query.name, (err, doc) => {
    //doc is a parameter
    if (err) {
      return res.status(500).json({ err }); // if error, return it
    }

    // if no matches,
    if (!doc) {
      //console.log(req.query.name);
      return res.json({ error: "wrong issue id" });
    }

    let issue = new Issue(defaultData);
    issue = doc;
    const savePromise = issue.save();
    // send back the name as a success for now
    savePromise.then(() =>
      res.json({
        issue_id: issue.issue_id,
        Name: issue.Name,
        Description: issue.Description,
        createdDate: issue.createdDate,
        Status: issue.Status,
      })
    );

    return null;
  });
};

// export the relevant public controller functions
module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3,
  page4: hostPage4,
  readIssue,
  getName,
  //setName,
  //updateLast,
  searchIssue,
  setIssue,
  //search,
};
