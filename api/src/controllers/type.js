const {getTypes} = require('./utlils')
const saveAllTypes= async (req,res)=>{
    try {
      sendTypes= await getTypes()
      res.status(200).json(sendTypes)
    } catch (error) {
      res.status(404).send('Type not found')
      console.log(error)
    }
  }
  module.exports = {
    saveAllTypes
  };