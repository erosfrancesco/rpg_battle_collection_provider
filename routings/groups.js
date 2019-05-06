const express = require('express');
const router = express.Router();

const {
    fetchGroups, fetchCategoryGroups, standardCallback,
    addCategoryGroup, writeIntoCategoryGroup,
    deleteCategoryGroup, deleteCategoryGroupItem
} = require("../logic/groups.js");


router.use(express.json());  
router.get("/", (req, res) => fetchGroups( standardCallback(res) ) );

//categories
router.route("/:category")
.get((req, res) => {
    const {category} = req.params;
    fetchCategoryGroups(category, standardCallback(res) );
})
.post((req, res) => {
    const {category} = req.params;
    const {label = ""} = req.body;
    addCategoryGroup(category, label, standardCallback(res) )
});

// selected category
router.route("/:category/:group")
.get((req, res) => {
    const {category, group} = req.params;
    fetchCategoryGroup(category, group, standardCallback(res));
})
.post((req, res) => {
    const {category, group} = req.params;
    const {label = ""} = req.body;
    writeIntoCategoryGroup(category, group, itemLabel, standardCallback(res) );
})
.delete((req, res) => {
    const {category, group} = req.params;
    deleteCategoryGroup(category, group, standardCallback(res));
});

// selected item
router.delete("/groups/:category/:group/:item", (req, res) => {
    const {category, group, item} = req.params;
    deleteCategoryGroupItem(category, group, item, standardCallback(res))
});  


module.exports = router;