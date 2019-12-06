const {organization, organizationRoles} = require('../models');
// const mongoose = require("mongoose")


const checkIfUserRoleExists = async (userRole, organizationId) => {
  try {
    const exists = await organizationRoles.findOne({ 
      $or: [
        { user: userRole.user },
        { organization: organizationId }
      ]})

    return !exists
  } catch (err) {
    throw err
  }
}


/* CREATE */
  const create = async (userRole, organization) => {
    try {
      const userRoleOptions = Object.assign(userRole, {organization})
      return await organizationRoles.create(userRoleOptions)
    } catch (err) {
      throw err
    }
  }

  const invite = async (userRoles, organizationId) => {
    try {
      const org = await organization.findOne({_id: organizationId})
      if (!org) {
        throw Error("Organization not found")
      }

      let res = []
      for (let userRole of userRoles) {
        if (await checkIfUserRoleExists(userRole, organizationId)) {
          res.push(await create(userRole, organizationId))
        }
      }

      return res
    } catch (err) {
      throw err
    }
  }
/**/


const remove = async id => {
  try {
    return await organizationRoles.findByIdAndDelete(id)
  } catch (err) {
    throw err
  }
}


const removeUserRoles = async ids => {
  try {
    let res = []
    for (let id of ids) {
      res.push(await remove(id))
    }

    return res
  } catch (err) {
    throw err
  }
}



module.exports = {
  detail: async (organization, id) => {
    try {
      return await organizationRoles.findById(id)
    } catch(err) {
      throw err
    }
  },

  list: async organization => {
    try {
      // const organization = mongoose.Types.ObjectId(organizationId)
      const ids = await organizationRoles.find({organization})
      return Array.isArray(ids) ? ids : [ids]
    } catch(err) {
      throw "[listing]" + err
    }
  },

  invite: async (userRoles, organization) => {
    try {
      return await invite(userRoles, organization)
    } catch(err) {
      throw err
    }
  },

  remove: async (userRoles, organization) => {
    try {
      console.log(userRoles, organization)
      return await removeUserRoles(userRoles, organization)
    } catch(err) {
      throw "[remove]" +err
    }
  },

  update: async (id, role, updates) => {
    try {
      return await organizationRoles.findByIdAndUpdate(role, updates)
    } catch(err) {
      throw err
    }
  }
}