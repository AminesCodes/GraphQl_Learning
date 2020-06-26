// Author model for the MangoDb database (not to be confused with the author schema for GraphQL)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillsSchema = new Schema({
    skill: String,
    deleted: Date
});
const skillsModel = mongoose.model('Skills', skillsSchema);

const cohortsSchema = new Schema({
    cohort: String,
    deleted: Date
});
const cohortsModel = mongoose.model('Cohorts', cohortsSchema);

module.exports = {
    skillsModel,
    cohortsModel
};