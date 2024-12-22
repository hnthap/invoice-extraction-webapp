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

        console.log('🦆')

        // POST
        // Đọc tệp hình ảnh
        const imageBuffer = input.buffer;
        const response = await axios.post(process.env.SCENE_TEXT_API_URL + '/api/process-image', imageBuffer, {
            headers: {
                'Content-Type': 'application/octet-stream',
            }
        });

        console.log('🦆🦆')

        if (response.data.success) {
            // const result = {
            //     "id" : response.data.data_id,
            //     "pr_parse": response.data.pr_parse,
            // }
            const result = response.data;
            delete result.success;
            console.log(result);
            await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1})
            res.json({
                success: true,
                message: "Image generated successfully",
                // creditBalance: user.creditBalance - 1,
                creditBalance: user.creditBalance, // TODO: Development only
                result,
            });
            console.log('🦆🦆🦆')
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