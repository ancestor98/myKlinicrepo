const mongoose=require("mongoose")

const hospitalschema= new mongoose.Schema({
    hospitalName: {
        type: String,
        required: [true, 'hospita name is Required']
    },
    hospitaEmail: {
        type: String,
        required: [true, 'hospitaEmail is required']
    },
    hospitaAddress: {
        type: String,
        default: function() {
            return `No 1 ${this.hospitaName}`;
        }
    },
    state: {
        type: String,
        default: 'Lagos'
    },
    country: {
        type: String,
        default: 'Nigeria'
    },
    hospitaLogo: {
        type: String,
        default: function() {
            return `SchoolLogoAvatar`
        }
    },
    regNo: {
        type: String,
        default: `PRM-ABCD-${Math.floor(Math.random() * 9000) + 1000}`
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Password is Required']
    },
    website: {
        type: String,
        default: function() {
            return this.hospitalEmail;
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }

})
const hospitalmodel= mongoose.model("hospital",hospitalschema)

module.exports=hospitalmodel