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

        response = {
            "success": True,
            "imageBase64Output": processed_image_base64,
            "info": {
                "width": processed_image.width,
                "height": processed_image.height,
                "format": "PNG"
            }
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