const express = require('express');
const router = express.Router();

const {
    fetchCategories,
    fetchResourceCategory,
    writeResourceCategory,
    patchResourceCategory,
    deleteResourceCategory
} = require("../logic/categories.js");


router.use(express.json());  
router.get("/", (req, res) => res.json(fetchCategories()) );


// category
router.route("/:category")
.get((req, res) => {
    const {category} = req.params;
    fetchResourceCategory(category, (errs, data) => {
        if (errs && errs.length) {
            console.log("error reading category:", category, ":", err);
            res.end(err);
            return;
        }
        res.json(data);
    });
})
.post((req, res) => {
    const {category} = req.params;
    const item = req.body;
    writeResourceCategory(category, item, (err, data) => {
        if (err) {
            console.log("error writing file", category);
            res.end();
            return;
        }
        res.json(data);
    });
})


// item
router.route("/:category/:item")
.patch((req, res) => {
    const {category, item} = req.params;
    const itemBody = req.body;
    patchResourceCategory(category, item, itemBody, (err, data) => {
        if (err) {
            console.log("error updating file [writing]", category);
            res.end();
            return;
        }
        res.json(data);
    });
})

router.delete("/resources/:category/:item", (req, res) => {
    const {category, item} = req.params;
    deleteResourceCategory(category, item, (err, data) => {
        if (err) {
            console.log("error deleting file [writing]", category);
            res.end();
            return;
        }
        res.json(data);
    });
});


module.exports = router;