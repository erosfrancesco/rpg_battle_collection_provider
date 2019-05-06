const config = require('../config');
const resourceDir = require("../src/index.js");
const groupDir = config.folders.groups;


/* READ */
    const fetchGroups = callback => resourceDir.read( groupDir, (err, res) => {
        if (err) {
            callback("error in fetching groups: " + err);
            return;
        }
        callback(null, res.data);
    });

    const fetchCategoryGroups = (category, callback) => {
        fetchGroups((err, groups) => {
            if (err) {
                callback("error in fetching group category " + category + ": " + err);
                return;
            }

            const selected = groups.filter(group => group.category === category)
            callback(null, selected)
        });
    };

    const fetchCategoryGroup = (category, label, callback) => {
        fetchGroups((err, groups) => {
            if (err) {
                callback("error in fetching group category " + category + ": " + err);
                return;
            }
            const filter = group => (group.category === category && group.label === label)
            const selected = groups.filter(filter)
            callback(null, selected)
        });
    };
/**/


/* WRITE */
    const addCategoryGroup = (category, label, callback) => {
        const item = {category, label, "elements": [] };
        resourceDir.write( groupDir, (err, res) => callback(err, (err ? null : res.data) ) );
    };

    const writeIntoCategoryGroup = (category, groupLabel, itemLabel, callback) => {
        fetchGroups((err, groups) => {
            const index = computeGroupIndex(groups, category, groupLabel);
            if (index < 0) {
                callback("no groups found");
                return;
            }

            groups[index].elements.push(itemLabel);
            resourceDir.update(groupDir, groups[index], index, (err, res) => callback(err, groups));
        });
    };
/**/


/* DELETE */
    const deleteCategoryGroup = (category, groupLabel, callback) => {
        fetchGroups((err, groups) => {
            const index = computeGroupIndex(groups, category, groupLabel);
            if (index < 0) {
                callback("no groups found");
                return;
            }

            groups.splice(index, 1);
            resourceDir.delete(groupDir, index, (err, res) => callback(err, groups));
        });
    };

    const deleteCategoryGroupItem = (category, groupLabel, itemIndex, callback) => {
        fetchGroups((err, groups) => {
            const index = computeGroupIndex(groups, category, groupLabel);
            if (index < 0) {
                callback("no groups found");
                return;
            }

            groups[index].elements.splice(itemIndex, 1);
            resourceDir.update(groupDir, groups[index], index, (err, res) => callback(err, groups));
        });
    };
/**/


/* HELPERS */
    const computeGroupIndex = (groups, category, label) => {
        if (!groups && !groups.length) {
            return -1;
        }

        const filter = group => (group.category === category && group.label === label);
        const index = groups.findIndex(filter);

        if (!groups[index]) {
            return -1;
        }

        return index;
    };

    const standardCallback = res => (err, data) => {
        if (err) {
            console.log(err);
            res.end();
            return;
        }
        res.json(data);
    };
/**/
    

module.exports = {
    fetchGroups, fetchCategoryGroups, standardCallback,
    addCategoryGroup, writeIntoCategoryGroup,
    deleteCategoryGroup, deleteCategoryGroupItem 
};