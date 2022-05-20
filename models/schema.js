const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const roleSchema = Schema({
  roleName: { type: String, unique: true, required: true },
  roleType: { type: Number, unique: true, required: true }
}, {
  timestamps: true,
  versionKey: false

});

const Roles = model("Roles", roleSchema);

const userSchema = Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, ref: "Roles" },
  countryCode: { type: Number, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pinCode: { type: String, required: true },
  isActive: { type: Number, default: 1 },
  token: { type: String, default: null }
}, {
  timestamps: true,
  versionKey: false
})

const User = model("Users", userSchema)

const proeprtyTypeSchema = Schema({
  propertyType: { type: String },

})

const PropertyTypeModel = model("property_types", proeprtyTypeSchema)

const propertySchema = Schema({
  propertyTypeId: { type: Schema.Types.ObjectId, ref: "property_types" },
  categoryType: { type: String },
  apartmentType: { type: String },
  //ownerShipType: { type: String },
  bhkType: { type: String, upperCase: true },
  totalFloor: { type: Number },
  propertyAge: { type: String },
  builtUpArea: { type: Number },
  facing: { type: String },
  expectedPrice: { type: Number, "default": null },
  expectedRent: { type: Number, "default": null },
  expectedDeposit: { type: Number, "default": null },
  monthlyMaintenance: { type: String },
  preferredTenants: { type: String },
  furnishing: { type: String },
  parking: { type: String },
  discription: { type: String },
  amenties: {
    bathroom: { type: Number },
    balcony: { type: Number },
    waterSupply: { type: String },
    availableAmenties: { type: Array, "default": [] },
  },
  images: { type: Array, required: false },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  pinCode: { type: Number },
  builder: { type: Number },
  postedBy: { type: Schema.Types.ObjectId, ref: "Users" },
  builderName: { type: String },
  webUrl: { type: String },
  mobileNumber: { type: String },
  proprtyType: { type: String },
  brochure: { type: String },
  isActive: { type: Number, default: 1 }
}, {
  timestamps: true,
  versionKey: false
})
const Property = model("properties", propertySchema)

const builderSchema = Schema({
  builderName: { type: String, required: true },
  webUrl: { type: String, required: true },
  address: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  price: { type: String, required: true },
  proprtyType: { type: String, required: true },
  brochure: { type: String, required: true },
  images: { type: Array, default: [] },
  postedBy: { type: Schema.Types.ObjectId, required: true },
}, { timestampes: true });

const builderModel = model("builderproperties", builderSchema);

const reportSchema = Schema({
  postId: { type: Schema.Types.ObjectId, ref: "properties" },
  reason: { type: String, required: true },
  reportedBy: { type: Schema.Types.ObjectId, ref: "Users" }

}, {
  timestamps: true,
  versionKey: false

})

const report = model("reports", reportSchema)

const adminSchema = Schema({
  roleName: { type: String, required: true },
  mailId: { type: String, required: true },
  password: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, ref: "Roles" },
  token: { type: String, default: null },
  isActive: { type: Number, default: 1 }
}, { timestampes: true });

const admin = model("admin", adminSchema);

module.exports = {
  Roles,
  User,
  Property,
  builderModel,
  PropertyTypeModel,
  report, admin
};
