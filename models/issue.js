const mongoose = require('mongoose');

function cleanRetDoc(doc, ret, options) {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    delete ret.project_name;
    delete ret.id;
    return ret;
};

const options = {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
        transform: cleanRetDoc
    }
};

const issueSchema = new mongoose.Schema({
    project_name: {
        type: String,
    },
    issue_title: {
        type: String,
        required: true
    },
    issue_text: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    assigned_to: {type: String},
    open: {
        type: Boolean,
        default: true,
    },
    status_text: {type:String}
},options);

issueSchema.virtual('created_on').get(function(){
    return this.createdAt;
});

issueSchema.virtual('updated_on').get(function(){
    return this.updatedAt;
});

module.exports = mongoose.model('Issue',issueSchema);