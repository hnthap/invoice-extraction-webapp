from flask import Flask, request, jsonify
from PIL import Image
import io
import base64

app = Flask(__name__)

def process_image(image_buffer):
    try:
        image = Image.open(io.BytesIO(image_buffer))
        
        processed_image = image.convert('L')
        buffered = io.BytesIO()
        processed_image.save(buffered, format="PNG")

        processed_image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

        # response = {
        #     "success": True,
        #     "imageBase64Output": processed_image_base64,
        #     "info": {
        #         "width": processed_image.width,
        #         "height": processed_image.height,
        #         "format": "PNG"
        #     }
        # }
        response = {
            "success": True,
            "data_id": "00081",
            "pr_parse": [
            [{"menu.nm": "SURIMI"}, {"menu.cnt": "1"}, {"menu.price": "29,091"}], 
            [{"menu.nm": "CREAMY CHK CLS FTC"}, {"menu.cnt": "1"}, {"menu.price": "42,727"}],
            [{"menu.nm": "MIX 4FUN CHOCOLATE"}, {"menu.cnt": "1"}], 
            [{"menu.nm": "GREEN ITSODA PITCHER"}, {"menu.price": "19,091"}, {"menu.cnt": "1"}], 
            [{"menu.nm": "SC/R GRILLED STEAK"}, {"menu.cnt": "1"}, {"menu.price": "99,091"}], 
            [{"sub_total.subtotal_price": "250,909"}, {"sub_total.tax_price": "25,091"}], 
            [{"total.total_price": "276,000"}]],
        }
        
        return jsonify(response)  # Trả về một JSON response
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/process-image', methods=['POST'])
def handle_image():
    try:
        image_buffer = request.data
        
        if not image_buffer:
            return jsonify({"success": False, "message": "Missing image data"}), 400
        
        return process_image(image_buffer) 
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)