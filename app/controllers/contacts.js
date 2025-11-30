let ContactModel = require('../models/contacts');

module.exports.getContact = async function (req, res, next) {
  try {
    let contact = await ContactModel.findOne({ _id: req.params.contactId });

    res.json(contact);

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.create = async function (req, res, next) {
  try {
    let contact = req.body;
    let result = await ContactModel.create(contact);
    console.log(result);

    res.status(200);
    res.json({
      success: true,
      message: "Contact created successfully."
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res.status(400).json({
        success: false,
        message: "Duplicate key error: A contact with this email already exists."
      });
    } else {
      console.log(error);
      next(error);
  }

}

module.exports.getAll = async function (req, res, next) {
  try {
    let list = await ContactModel.find();

    res.json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {
    let updatedContact = ContactModel(req.body);
    updatedContact._id = req.params.contactId;
    let result = await ContactModel.updateOne({ _id: req.params.contactId }, updatedContact);
    console.log(result);

    if (result.modifiedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Contact updated successfully."
        }
      );
    } else {
      throw new Error('Contact not updated. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.remove = async function (req, res, next) {
  try {
    let result = await ContactModel.deleteOne({ _id: req.params.contactId });
    console.log(result);

    if (result.deletedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Contact deleted successfully."
        }
      );
    } else {
      throw new Error('Contact not deleted. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.removeAll = async function (req, res, next) {
  try {
    let result = await ContactModel.deleteMany();
    console.log(result);

    if (result.deletedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "All contacts were deleted successfully."
        }
      );
    } else {
      throw new Error('Contacts were not deleted')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}
