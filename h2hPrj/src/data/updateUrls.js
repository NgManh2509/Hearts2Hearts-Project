import fs from 'fs';
import path from 'path';

// Vì file là ES module nên dùng process.cwd() để lấy đường dẫn chạy lệnh
const filePath = path.join(process.cwd(), 'src/data/fanCamData.js');

try {
  let content = fs.readFileSync(filePath, 'utf8');

  // Tìm /upload/ và thay bằng /upload/f_auto,q_auto/ (chỉ khi chưa có f_auto,q_auto)
  content = content.replace(/\/upload\/(?!f_auto,q_auto\/)/g, '/upload/f_auto,q_auto/');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Đã thêm f_auto,q_auto vào các URL trong fanCamData.js thành công!');
} catch (error) {
  console.error('❌ Có lỗi xảy ra:', error);
}
