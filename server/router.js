// import controllers
// Only specifies the folder name,automatically pulls index.js file
const controllers = require("./controllers");
//console.log("hi in Router");
// function to attach routes
const router = (app) => {
  // app.get handles GET requests
  // app.post handles POST requests
  //console.log("hi in Router");
  //page 1 is user login(Collaborator,Mentor)
  //app.get("/page1", controllers.page2);
  //page 2 is to insert a new issue
  app.get("/page2", controllers.page2);
  //page 3 is to search for an issue by Id
  app.get("/page3", controllers.page3);
  //page 4 is to be used by mentor to assign issues to collaborator
  app.get("/page4", controllers.page4);
  //get name of issue
  app.get("/getName", controllers.getName);
  //app.get("/findByName", controllers.searchName);
  //app.get("/findCollaborator", controllers.searchCollaborator);
  app.get("/findIssue", controllers.searchIssue);

  app.get("/", controllers.index);

  //app.get("/*", controllers.notFound);

  //app.post("/setName", controllers.setName);
  app.post("/setIssue", controllers.setIssue);

  //to update an issue TO BE IMPLEMENTED
  //app.post("/updateIssue", controllers.updateLast);
};

// export the router function
module.exports = router;
