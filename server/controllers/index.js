const models = require("../models");

//models
const Issue = models.Issue.IssueModel;
const Collaborator = models.Collaborator.IssueModel;
const Mentor = models.Mentor.IssueModel;

// function to find all the issues on request.
const readAllIssues = (req, res, callback) => {
  // Call the model's built in find function and provide it a
  // callback to run when the query is complete
  // The built in find function returns an array of matching objects.
  Issue.find(callback).lean();
};
