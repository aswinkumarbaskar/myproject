const nodeCron = require("node-cron")
const mongoose = require("mongoose")
const { Schema, model } = mongoose
const app = require("express")()
// nodeCron.schedule('* * * * *',()=>{
mongoose.connect("mongodb+srv://veeramaheshwaranrajagopal:12345@veera.mpzsi.mongodb.net/shop?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("DB CONNECTION ERROR")
    }
    else {
        console.log("Db Connected")
    }

})
// const planSchema=Schema({
//     planType:{type:String,required:true}

// },{
//     timestamps:true,
//     versionKey:false
// })

const MoneyBackPlanSchema = Schema({

    moneyBackPlan: {
        price: { type: Number, "default": 16499 },
        guaranteedBuyerOrMoneyback: { type: String, "default": "NO" },
        personalFieldAssistant: { type: String, "default": "NO" },
        propertyPromotionOnSite: { type: String, "default": "YES" },
        relationshipManager: { type: String, "default": "YES" },
        facebookMarketingOfProperty: { type: String, "default": "YES" },
        privacyOfYourPhoneNumber: { type: String, "default": "YES" },
        ShowingPropertyOnYourBehalf: { type: String, "default": "NO" },
        photoshootOfYourProperty: { type: String, "default": "NO" },
        planValidity: { type: String, "default": "6 Months" }
    }

})

const relaxPlanSchema = Schema({
    relaxPlan: {
        price: { type: Number, "default": 7499 },
        guaranteedBuyerOrMoneyback: { type: String, "default": "YES" },
        personalFieldAssistant: { type: String, "default": "NO" },
        propertyPromotionOnSite: { type: String, "default": "YES" },
        relationshipManager: { type: String, "default": "YES" },
        facebookMarketingOfProperty: { type: String, "default": "YES" },
        privacyOfYourPhoneNumber: { type: String, "default": "YES" },
        ShowingPropertyOnYourBehalf: { type: String, "default": "YES" },
        photoshootOfYourProperty: { type: String, "default": "YES" },
        planValidity: { type: String, "default": "3 Months" }
    },
})

const superMoneyBackPlanSchema = Schema({
    superMoneyBackPlan: {
        price: { type: Number, "default": 20999 },
        guaranteedBuyerOrMoneyback: { type: String, "default": "YES" },
        personalFieldAssistant: { type: String, "default": "YES" },
        propertyPromotionOnSite: { type: String, "default": "YES" },
        relationshipManager: { type: String, "default": "YES" },
        facebookMarketingOfProperty: { type: String, "default": "YES" },
        privacyOfYourPhoneNumber: { type: String, "default": "YES" },
        ShowingPropertyOnYourBehalf: { type: String, "default": "YES" },
        photoshootOfYourProperty: { type: String, "default": "YES" },
        planValidity: { type: String, "default": "6 Months" }
    },



})

const superRelaxPlanSchema = Schema({
    superRelaxPlan: {
        price: { type: Number, "default": 11499 },
        guaranteedBuyerOrMoneyback: { type: String, "default": "NO" },
        personalFieldAssistant: { type: String, "default": "NO" },
        propertyPromotionOnSite: { type: String, "default": "YES" },
        relationshipManager: { type: String, "default": "YES" },
        facebookMarketingOfProperty: { type: String, "default": "YES" },
        privacyOfYourPhoneNumber: { type: String, "default": "YES" },
        ShowingPropertyOnYourBehalf: { type: String, "default": "YES" },
        photoshootOfYourProperty: { type: String, "default": "YES" },
        planValidity: { type: String, "default": "3 Months" }
    }


})

const sellerPlanSchema = Schema({
    plan: { type: String, "default": "seller" }, planType: [MoneyBackPlanSchema]

}, { timestamps: true, versionKey: false })


const planModel = model("plans", sellerPlanSchema)
async function createPlan() {
    await new planModel({

    }).save()
}
createPlan()
