const mongoose = require("mongoose");

const { Schema} = mongoose;

//replace enum

const propertyAdsType = Schema({
    adsName: { type: String, required: true },
    propertyType: { type: String, enum: ["residential", "commercial"] }
});

const postSchema = Schema({
    adsType: { type: Schema.Types.ObjectId, ref: 'adsType' },
    property: {
        roomDetails: [{
            room: {
                roomType: { type: String, required: false },
                rent: { type: Number, required: false },
                deposit: { type: Number, required: false },
                amenities: { type: Array, default: null }
            }, required: false
        }],
        apartmentType: { type: String, required: false },
        bhkType: { type: String, required: true },
        floor: { type: String, required: true },
        totalNumberofFloor: { type: String, required: true },
        propertyAge: { type: String, required: true },
        facing: { type: String, required: false },
        builtUpArea: { type: String, required: true },
        ownershipType: { type: String, required: false },
        carpetArea: { type: String, required: false },
        floorType: { type: String, required: false },
        roomType: { type: String, required: false },
        propertyType: { type: String, required: false },
        buildingProperty: { type: String, required: false },
        otherFeatures: { type: String, required: false },
    },
    locationDetails: {
        city: { type: String, required: true },
        locality: { type: String, required: true },
        landmark: { type: String, required: true },
        maplLocation: { type: String, required: false }
    },
    propertyDetails: {
        price: { type: Number, required: true },
        maintance: { type: String, default: 'no' },
        maintanceCost: { type: Number, required: false },
        depositAmount: { type: Number, required: false },
        tenantTypes: { type: String, required: true },
        furnishing: { type: String, required: true },
        ownershipType: { type: String, required: false },
        kitchenType: { type: String, required: false },
        propertyAvailbleType: { type: String, required: false },
        leaseDuration: { type: String, required: false },
        lockinPeroid: { type: String, required: false },
        preferedGuests: { type: String, required: false },
        food: { type: String, required: false },
        rulesOfPg: { type: Array, default: [] },
        gateClosingTime: { type: String, required: false },
        tags: { type: Array, default: [] },
        availableFrom: { type: Date, required: true },
        description: { type: String, required: true }

    },
    amenities: {
        bathRoom: { type: Number, required: true },
        balcony: { type: Number, required: false },
        waterSupply: { type: String, required: false, default: null },
        gym: { type: String, required: false, default: null },
        foodType: { type: String, required: false, default: null },
        Security: { type: String, required: false, default: null },
        propertyRights: { type: Number, required: true },//who will show the property
        powerBackup: { type: String, required: false },
        lift: { type: String, required: false },
        parking: { type: String, require: true },
        washRoom: { type: String, required: false },
        laundry: { type: String, required: false },
        cleaning: { type: String, required: false },
        availableAmenities: { type: Array, default: [] }

    },
    gallery: {
        images: { type: Array, default: [] },
        videos: { type: Array, default: [] }
    },
    schedule: {
        time: { type: String, required: false },
        availability: { type: Date, required: false }
    },
    additionalInformation: {
        occupancy: { type: String, required: false },
        paintStatus: { type: String, required: false },
        cleanStatus: { type: String, required: false },
        alternateNumber: { type: String, required: false }
    }
});