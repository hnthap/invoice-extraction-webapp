import userModel from "../models/userModel.js";

const generateImage = async (req, res) => {
    try {
        const userId = req.userId;
        const input = req.file;

        const user = await userModel.findById(userId)

        if(!user || !input){
            return res.status(400).json({ success: false, message: "Missing Details", userId, input });
        }

        if(user.creditBalance === 0 || userModel.creditBalance < 0){
            return res.status(400).json({ success: false, message: "Insufficient Credits", creditBalance: user.creditBalance});
        }

        const resultImage = input;

        await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1})
        res.json({ success: true, message: "Image generated successfully", creditBalance: user.creditBalance - 1, resultImage });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { generateImage };