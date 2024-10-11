// ------BẤM THÀNH PHỐ SẼ RA QUẬN------ //

function showCitySelect() {
    var citySelect = document.getElementById('citySelect');
    var districtSelect = document.getElementById('districtSelect');

    // Kiểm tra xem quận đã được chọn hay chưa
    if (citySelect.value !== 'default') {
        districtSelect.style.display = 'block'; // Hiện thị hộp chọn thành phố
    } else {
        districtSelect.style.display = 'none'; // Ẩn hộp chọn thành phố nếu không có quận nào được chọn
    }
}

// ------ICON SẼ BẤM RA GIỎ HÀNG------ //

document.getElementById('cart-toggle').addEventListener('click', function () {
    const cart = document.getElementById('cart');
    cart.classList.toggle('open'); // Thay đổi class 'open'

    // Hiện giỏ hàng khi mở
    if (cart.classList.contains('open')) {
        cart.style.display = 'block'; // Hiện giỏ hàng
    } else {
        setTimeout(() => {
            cart.style.display = 'none'; // Ẩn giỏ hàng
        }, 300); // Thời gian tương ứng với transition
    }
});

document.getElementById('cart-close').addEventListener('click', function () {
    const cart = document.getElementById('cart');
    cart.classList.remove('open'); // Bỏ class 'open'
    setTimeout(() => {
        cart.style.display = 'none'; // Ẩn giỏ hàng
    }, 300); // Thời gian tương ứng với transition
});
//------------------------------------------------//

// ------GIỎ HÀNG------ //
let cart = []; // Mảng để lưu trữ sản phẩm trong giỏ hàng
const totalPriceElement = document.getElementById('total-price');
const cartItemsElement = document.getElementById('cart-items');
const cartNoticeElement = document.querySelector('.header_cart-notice'); // Lấy phần tử hiển thị số lượng
const emptyCartMessage = document.getElementById('empty-cart-message');

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(element) {
    const productName = element.getAttribute('data-name');
    const productPrice = parseInt(element.getAttribute('data-price'));
    const productImage = element.getAttribute('data-image'); // Lấy hình ảnh sản phẩm
    
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1; // Tăng số lượng nếu đã có sản phẩm
    } else {
        cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 }); // Thêm sản phẩm mới vào giỏ hàng
        updateCartIcon(); // Cập nhật số lượng trong biểu tượng giỏ hàng chỉ khi thêm sản phẩm mới
    }
    
    updateCart();
}

// Hàm cập nhật giỏ hàng
function updateCart() {
    cartItemsElement.innerHTML = ''; // Xóa danh sách sản phẩm hiện tại
    let totalPrice = 0; // Biến để tính tổng tiền

    if (cart.length === 0) {
        cartItemsElement.appendChild(emptyCartMessage); // Hiển thị thông báo giỏ hàng trống
        totalPriceElement.innerText = '0₫'; // Cập nhật tổng tiền
        return;
    }

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                <div>
                    ${item.name} - ${item.price}₫ x 
                    <button onclick="changeQuantity('${item.name}', -1)">-</button> 
                    ${item.quantity} 
                    <button onclick="changeQuantity('${item.name}', 1)">+</button> 
                    <button onclick="removeFromCart('${item.name}')">Xóa</button>
                </div>
            </div>
        `;
        cartItemsElement.appendChild(li);
        totalPrice += item.price * item.quantity; // Cộng tổng tiền
    });

    totalPriceElement.innerText = totalPrice + '₫'; // Cập nhật tổng tiền
}

// Hàm cập nhật số lượng sản phẩm khác nhau trong biểu tượng giỏ hàng
function updateCartIcon() {
    const uniqueItems = cart.length; // Số lượng sản phẩm khác nhau trong giỏ hàng
    cartNoticeElement.innerText = uniqueItems; // Cập nhật số lượng trong biểu tượng giỏ hàng
}

// Hàm thay đổi số lượng sản phẩm
function changeQuantity(productName, change) {
    const product = cart.find(item => item.name === productName);
    
    if (product) {
        product.quantity += change; // Tăng hoặc giảm số lượng
        if (product.quantity <= 0) {
            removeFromCart(productName); // Xóa sản phẩm nếu số lượng <= 0
        } else {
            updateCart(); // Cập nhật giỏ hàng
        }
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName); // Lọc ra sản phẩm không muốn giữ
    updateCart(); // Cập nhật giỏ hàng
    updateCartIcon(); // Cập nhật số lượng trong biểu tượng giỏ hàng
}

// Hàm đóng giỏ hàng
document.getElementById('cart-close').addEventListener('click', () => {
    document.getElementById('cart').style.display = 'none';
});

// Hàm mở giỏ hàng (có thể gọi từ icon giỏ hàng)
document.getElementById('cart-toggle').addEventListener('click', () => {
    document.getElementById('cart').style.display = 'block';
});

// function removeItem(button) {
//     const cartItem = button.closest('.header__cart-item');
//     const quantity = parseInt(cartItem.querySelector('.header__cart-item-quantity').textContent);
//     const price = parseInt(cartItem.querySelector('.header__cart-item-price').textContent.replace('₫', '').replace('.', '').replace(',', ''));
//     const itemTotalPrice = price * quantity; // Tính tổng giá của sản phẩm
//     totalPrice -= itemTotalPrice; // Giảm tổng giá
//     totalItems -= quantity; // Giảm số lượng sản phẩm
//     totalPriceEl.textContent = `${totalPrice.toLocaleString()}₫`;
//     cartNotice.textContent = totalItems; // Cập nhật số lượng sản phẩm trong giỏ hàng
//     cartItem.remove(); // Xóa sản phẩm khỏi giỏ hàng
// }
//------------------------------------------------//





