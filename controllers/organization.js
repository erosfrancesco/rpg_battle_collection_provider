const {organization} = require('../models');
const OrganizationRoleController = require("./organizationRoles")
const {defaultErrorHandler, defaultResponseHandler} = require('./utils')



module.exports = {
  create: async (req, res) => {
    try {
      const {name} = req.body
      const {id: admin} = req.user
      defaultResponseHandler(res, await organization.create({admin, name}))
    } catch(err) {
      defaultErrorHandler(res, "Error [Organization Create]: " + err)
    }
  },

  detail: async (req, res) => {
    try {
      const {id} = req.params;
      defaultResponseHandler(res, await organization.findById(id))
    } catch(err) {
      defaultErrorHandler(res, "Error [Organization Detail]: " + err)
    }
  },
  
  list: async (req, res) => {
    try {
      defaultResponseHandler(res, await organization.find())
    } catch(err) {
      defaultErrorHandler(res, "Error [Organization List]: " + err)
    }
  },

  remove: async (req, res) => {
    try {
      const {id} = req.params
      const item = await organization.findByIdAndRemove(id)
      const roles = await OrganizationRoleController.list(id)

      await OrganizationRoleController.remove(roles.map(role => role._id), id)
      
      defaultResponseHandler(res, item)
    } catch(err) {
      defaultErrorHandler(res, "Error [Organization Delete]: " + err)
    }
  },
  
  update: async (req, res) => {
    try {
      const {id} = req.params
      const {name} = req.body
      const options = { new: true, lean: true };
      defaultResponseHandler(res, await organization.findByIdAndUpdate(id, {name}, options) )
    } catch(err) {
      defaultErrorHandler(res, "Error [Organization Update]: " + err)
    }
  },




  // user roles
  roleDetail: async (req, res) => {
    try {
      const {id, role} = req.params
      defaultResponseHandler(res, await OrganizationRoleController.detail(id, role))
    } catch(err) {
      defaultErrorHandler(res, "Error [Organization Role Detail]: " + err)
    }
  },

  roleList: async (req, res) => {
    try {
      const {id} = req.params
      defaultResponseHandler(res, await OrganizationRoleController.list(id))
    } catch(err) {
      defaultErrorHandler(res, "Error [Organization Role List]: " + err)
    }
  },

  invite: async (req, res) => {
    try {
      const {id} = req.params
      const {userRoles} = req.body
      defaultResponseHandler(res, await OrganizationRoleController.invite(userRoles, id))
    } catch(err) {
      defaultErrorHandler(res, "Error [Organization Role Create]: " + err)
    }
  },

  revoke: async (req, res) => {
    try {
      const {id} = req.params
      const {userRoles} = req.body
      defaultResponseHandler(res, await OrganizationRoleController.remove(userRoles, id))
    } catch(err) {
      defaultErrorHandler(res, "Error [Organization Role Delete]: " + err)
    }
  },

  roleUpdate: async (req, res) => {
    try {
      const {id, role} = req.params
      const {roles} = req.body
      const updates = {roles}
      defaultResponseHandler(res, await OrganizationRoleController.update(id, role, updates))
    } catch(err) {
      defaultErrorHandler(res, "Error [Organization Role Delete]: " + err)
    }
  }
}