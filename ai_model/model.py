from flask import Flask, request, jsonify
from PIL import Image
import io
import base64

app = Flask(__name__)

def process_image(image_buffer):
    try:
        # Mở ảnh từ buffer
        image = Image.open(io.BytesIO(image_buffer))
        
        # Thực hiện xử lý ảnh (ví dụ: chuyển đổi sang grayscale)
        processed_image = image.convert('L')  # Chuyển đổi sang ảnh grayscale
        buffered = io.BytesIO()
        processed_image.save(buffered, format="PNG")

        # Tạo base64 cho ảnh đã xử lý
        processed_image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

        # Tạo JSON response
        response = {
            "message": "Image processed successfully",
            "imageBase64Output": processed_image_base64,
            "info": {
                "width": processed_image.width,
                "height": processed_image.height,
                "format": "PNG"
            }
        }
        
        return jsonify(response)  # Trả về một JSON response
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500  # Trả về lỗi nếu có

@app.route('/api/process-image', methods=['POST'])
def handle_image():
    try:
        # Nhận dữ liệu nhị phân từ request
        image_buffer = request.data  # Lấy dữ liệu nhị phân từ body
        
        if not image_buffer:
            return jsonify({"success": False, "message": "Missing image data"}), 400
        
        return process_image(image_buffer) 
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500  # Trả về lỗi nếu có

if __name__ == '__main__':
    app.run(port=5001)  # Chạy API trên cổng 5001