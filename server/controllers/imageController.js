import userModel from "../models/userModel.js";
import axios from "axios";

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

        console.log('🦆 image is ok to load to AI server, proceeding to do so')

        const imageBlob = new Blob([input.buffer])
        const formData = new FormData();
        formData.append('image', imageBlob, 'image.jpg')
        const url = process.env.SCENE_TEXT_API_URL + '/api/process-image'
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        console.log('🦆🦆 AI server responsed with data, proceeding to response back to client')

        if (response.data.success) {
            // const result = {
            //     "id" : response.data.data_id,
            //     "pr_parse": response.data.pr_parse,
            // }
            const result = response.data;
            delete result.success;

            await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance}) // TODO: remove this
            // await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1})
            res.json({
                success: true,
                message: "Image generated successfully",
                // creditBalance: user.creditBalance - 1,
                creditBalance: user.creditBalance, // TODO: Development only
                result,
            });
            console.log('🦆🦆🦆 ok')
        }else {
            console.log(response.data.message);
            return res.status(400).json({ success: false, message: "Error processing image", details: response.data.message });
        }

        // const result = 'hihi';
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { generateImage };