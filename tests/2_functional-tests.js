const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let tempId;

suite('Functional Tests', function() {
  this.timeout(1000);

const preliminariOn = false;
if(preliminariOn){
// test preliminari
// #A
test('Create an issue with every field: POST request to /api/issues/{project}',function(done){
    chai
        .request(server)
        .keepOpen()
        .post('/api/issues/preliminari')
        .send({
            issue_title: "Test preliminare A",
            issue_text: "Testo A",
            created_by: "User01",
            assigned_to: "Dev01",
            status_text: "Signaled"
        })
        .end(function(err,res){
            tempId = res.body._id;
            assert.equal(res.body.issue_title,'Test preliminare A');
            assert.equal(res.body.issue_text,'Testo A');
            assert.equal(res.body.created_by,'User01');
            assert.equal(res.body.assigned_to,'Dev01');
            assert.equal(res.body.status_text,'Signaled');
            done();
        });
});
// #B
test('Create an issue with every field: POST request to /api/issues/{project}',function(done){
    chai
        .request(server)
        .keepOpen()
        .post('/api/issues/preliminari')
        .send({
            issue_title: "Test preliminare B",
            issue_text: "Testo B",
            created_by: "User01",
            assigned_to: "Dev01",
            status_text: "Signaled"
        })
        .end(function(err,res){
            tempId = res.body._id;
            assert.equal(res.body.issue_title,'Test preliminare B');
            assert.equal(res.body.issue_text,'Testo B');
            assert.equal(res.body.created_by,'User01');
            assert.equal(res.body.assigned_to,'Dev01');
            assert.equal(res.body.status_text,'Signaled');
            done();
        });
});
// #C
test('Create an issue with every field: POST request to /api/issues/{project}',function(done){
    chai
        .request(server)
        .keepOpen()
        .post('/api/issues/preliminari')
        .send({
            issue_title: "Test preliminare C",
            issue_text: "Testo C",
            created_by: "User01",
            assigned_to: "Dev02",
            status_text: "Signaled"
        })
        .end(function(err,res){
            tempId = res.body._id;
            assert.equal(res.body.issue_title,'Test preliminare C');
            assert.equal(res.body.issue_text,'Testo C');
            assert.equal(res.body.created_by,'User01');
            assert.equal(res.body.assigned_to,'Dev02');
            assert.equal(res.body.status_text,'Signaled');
            done();
        });
});
// #D
test('Create an issue with every field: POST request to /api/issues/{project}',function(done){
    chai
        .request(server)
        .keepOpen()
        .post('/api/issues/preliminari')
        .send({
            issue_title: "Test preliminare D",
            issue_text: "Testo D",
            created_by: "User01",
            assigned_to: "Dev02",
            status_text: "Advanced"
        })
        .end(function(err,res){
            tempId = res.body._id;
            assert.equal(res.body.issue_title,'Test preliminare D');
            assert.equal(res.body.issue_text,'Testo D');
            assert.equal(res.body.created_by,'User01');
            assert.equal(res.body.assigned_to,'Dev02');
            assert.equal(res.body.status_text,'Advanced');
            done();
        });
});
};

    // #1
    test('Create an issue with every field: POST request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/test')
            .send({
                issue_title: "Chai test",
                issue_text: "Chai test text",
                created_by: "Chai",
                assigned_to: "Developer",
                status_text: "Signaled"
            })
            .end(function(err,res){
                tempId = res.body._id;
                assert.equal(res.body.issue_title,'Chai test');
                assert.equal(res.body.issue_text,'Chai test text');
                assert.equal(res.body.created_by,'Chai');
                assert.equal(res.body.assigned_to,'Developer');
                assert.equal(res.body.status_text,'Signaled');
                done();
            });
    });
    // #2
    test('Create an issue with only required fields: POST request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/test')
            .send({
                issue_title: "Chai test",
                issue_text: "Chai test text",
                created_by: "Chai",
            })
            .end(function(err,res){
                assert.equal(res.body.issue_title,'Chai test');
                assert.equal(res.body.issue_text,'Chai test text');
                assert.equal(res.body.created_by,'Chai');
                assert.equal(res.body.assigned_to,'');
                assert.equal(res.body.status_text,'');
                done();
            });
    });
    // #3
    test('Create an issue with missing required fields: POST request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/test')
            .send({
                issue_title: "Chai test",
                issue_text: "Chai test text",
            })
            .end(function(err,res){
                assert.equal(res.body.error,'required field(s) missing');
                done();
            });
    });
    // #4
    test('View issues on a project: GET request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/preliminari')
            .end(function(err,res){
                assert.isArray(res.body);
                assert.equal(res.body.length,4)
                done();
            });
    });
    // #5
    test('View issues on a project with one filter: GET request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/preliminari?created_by=User01')
            .end(function(err,res){
                assert.isArray(res.body);
                assert.equal(res.body.length,4);
                done();
            });
    });
    // #6
    test('View issues on a project with multiple filters: GET request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            //.get('/api/issues/preliminari?created_by=User01&assigned_to=Dev01')
            .get('/api/issues/preliminari?_id=678fecef48477a417266703b&assigned_to=Dev01')
            .end(function(err,res){
                console.log(res.body)
                assert.isArray(res.body);
                assert.equal(res.body.length,1);
                done();
            });
    });
    // #7
    test('Update one field on an issue: PUT request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/test')
            .send({
                _id:"678e76365078517acf9da7f3",
                issue_title:"Chai test modified"
            })
            .end(function(err,res){
                assert.equal(res.body.result,'successfully updated');
                done();
            });
    });
    // #8
    test('Update multiple fields on an issue: PUT request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/test')
            .send({
                _id:"678e76365078517acf9da7f3",
                issue_title:"Chai test modified again",
                issue_text:"Chai test text modified"
            })
            .end(function(err,res){
                assert.equal(res.body.result,'successfully updated');
                done();
            });
    });
    // #9
    test('Update an issue with missing _id: PUT request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/test')
            .send({
                issue_title:"Chai test modified again",
            })
            .end(function(err,res){
                assert.equal(res.body.error,'missing _id');
                done();
            });
    });
    // #10
    test('Update an issue with no fields to update: PUT request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/test')
            .send({
                _id:"678e76365078517acf9da7f3"
            })
            .end(function(err,res){
                assert.equal(res.body.error,'no update field(s) sent');
                done();
            });
    });
    // #11
    test('Update an issue with an invalid _id: PUT request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .put('/api/issues/test')
            .send({
                _id:"678e76365078515acf9da7f",
                issue_title:"Chai test modified again",
                issue_text:"Chai test text modified"
            })
            .end(function(err,res){
                assert.equal(res.body.error,'could not update');
                done();
            });
    });
    // #12
    test('Delete an issue: DELETE request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .delete('/api/issues/test')
            .send({
                _id:tempId,
            })
            .end(function(err,res){
                assert.equal(res.body.result,'successfully deleted');
                done();
            });
    });
    // #13
    test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .delete('/api/issues/test')
            .send({
                _id:'abcde',
            })
            .end(function(err,res){
                assert.equal(res.body.error,'could not delete');
                done();
            });
    });
    // #14
    test('Delete an issue with missing _id: DELETE request to /api/issues/{project}',function(done){
        chai
            .request(server)
            .keepOpen()
            .delete('/api/issues/test')
            .send({})
            .end(function(err,res){
                assert.equal(res.body.error,'missing _id');
                done();
            });
    });
    // 

});
