'use strict';

const Issue = require('../models/issue.js');
const {ObjectId} = require('mongodb');

if(!ObjectId){console.log('Error in importing ObjectId')};

module.exports = function (app) {

  app.route('/api/issues/:project')
    // -- GET
    .get(async function (req, res) {
      const keys = [
        '_id',
        'issue_title',
        'issue_text',
        'created_by',
        'assigned_to',
        'open',
        'status_text'
      ];
      let project = req.params.project;
      const query = {project_name:project};
      keys
        .filter(key=>(req.query[key]!=undefined))
        .forEach(key=>{
          query[key] = (key==='_id')
            ? new ObjectId(req.query[key])
            : req.query[key]
        });

        console.log('query');
        console.log(query);

      const issues = await Issue.find(query);
      const retIssues = issues.map(issue=>(issue.toJSON()));
      return res.json(retIssues);
    })
    // -- POST    
    .post(function (req, res) {
      let project = req.params.project;
      const {
        issue_title,
        issue_text,
        created_by,
        assigned_to,    
        status_text
      } = req.body;
      const newIssue = new Issue({
        project_name: project,
        issue_title,
        issue_text,
        created_by,
        assigned_to,    
        status_text
      });
      newIssue
        .save()
        .then((doc)=>{
          res.json(doc.toJSON());    
        })
        .catch((err)=>{
          res.json({error: 'required field(s) missing'});
        })
      return;
    })
    // PUT
    .put(async function (req, res){
      const {project} = req.params;
      // check _id presence
      const {_id} = req.body;
      if(!_id){
        return res.json({
          error:'missing _id'
        })
      };
      // check update fields presence
      const keysToExclude = ['id','_id'];
      const relevantKeys = Object.keys(req.body)
        .filter(key=>(!keysToExclude.includes(key)))
        .filter(key=>(req.body[key]!==undefined&&req.body[key]!=''));
      if(relevantKeys.length<1){
        return res.json({
          error: 'no update field(s) sent',
          '_id': _id
        });
      };
      // find document
      let requiredIssue;
      try {
        requiredIssue = await Issue.findById(req.body._id);  
      } catch (error) {
      }
      // check if document was found
      if(!requiredIssue){
        return res.json({
          error: 'could not update',
          '_id': _id
        })
      };
      // modify and save
      relevantKeys.forEach(key=>{requiredIssue[key]=req.body[key]});
      await requiredIssue.save();
      res.json({result:'successfully updated','_id':req.body._id });
    })
    // -- DELETE
    .delete(async function (req, res){
      let project = req.params.project;
      const {_id} = req.body;
      if(!_id){
        return res.json({
          error: 'missing _id'
        });
      };
      try {
        const deletedDoc = await Issue.findByIdAndDelete(_id);
        if(deletedDoc){
          return res.json({
            result:'successfully deleted',
            _id:_id    
          });
        }
      } catch (error) {
      };
      return res.json({
        error: 'could not delete',
        _id:_id
      });
    });
    // --
};
