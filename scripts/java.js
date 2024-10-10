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

const cartItems = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const cartNotice = document.querySelector('.header_cart-notice'); // Phần thông báo số lượng giỏ hàng
let totalPrice = 0;
let totalItems = 0; // Biến để theo dõi tổng số sản phẩm

function addToCart(button) {
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));
    const imgSrc = button.closest('.menu_eat').querySelector('.img_menu').src;

    // Tìm sản phẩm trong giỏ hàng
    const existingItem = Array.from(cartItems.children).find(item => {
        return item.querySelector('.header__cart-item-name').textContent === name;
    });

    if (existingItem) {
        // Nếu sản phẩm đã có, chỉ tăng số lượng
        const quantityEl = existingItem.querySelector('.header__cart-item-quantity');
        const quantity = parseInt(quantityEl.textContent) + 1;
        quantityEl.textContent = quantity;

        // Cập nhật tổng giá
        totalPrice += price; // Thêm giá sản phẩm vào tổng
    } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        const cartItem = document.createElement('li');
        cartItem.classList.add('header__cart-item');
        cartItem.innerHTML = `
            <img src="${imgSrc}" alt="" class="header__cart-item-img">
            <div class="header__cart-item-info">
                <div class="header__cart-item-head">
                    <h5 class="header__cart-item-name">${name}</h5>
                    <div class="header__cart-item-price-wrap">
                        <span class="header__cart-item-price">${price.toLocaleString()}₫</span>
                        <span class="header__cart-item-x">x</span>
                        <span class="header__cart-item-quantity">1</span>
                    </div>
                </div>
                <div class="header__cart-item-body">
                    <span class="header__cart-item-description">Phân loại Full box</span>
                    <span class="header__cart-item-delete" onclick="removeItem(this)">Xóa</span>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(this, -1)">-</button>
                        <span class="header__cart-item-quantity">1</span>
                        <button onclick="changeQuantity(this, 1)">+</button>
                    </div>
                </div>
            </div>
        `;

        // Thêm sản phẩm vào giỏ hàng
        cartItems.appendChild(cartItem);
        totalPrice += price; // Cập nhật tổng giá
        totalItems++; // Tăng số lượng sản phẩm
    }

    // Cập nhật tổng giá hiển thị
    totalPriceEl.textContent = `${totalPrice.toLocaleString()}₫`;
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    cartNotice.textContent = totalItems;
}

function changeQuantity(button, change) {
    const cartItem = button.closest('.header__cart-item');
    const quantityEl = cartItem.querySelector('.header__cart-item-quantity');
    const price = parseInt(cartItem.querySelector('.header__cart-item-price').textContent.replace('₫', '').replace('.', '').replace(',', ''));

    // Tính toán số lượng mới
    let quantity = parseInt(quantityEl.textContent) + change;

    // Đảm bảo số lượng không dưới 1
    if (quantity < 1) {
        quantity = 1; // Không cho giảm xuống dưới 1
    }

    quantityEl.textContent = quantity; // Cập nhật số lượng

    // Cập nhật tổng giá trong giỏ hàng
    updateTotalPrice();
}

function updateTotalPrice() {
    const cartItems = document.querySelectorAll('.header__cart-item');
    totalPrice = 0; // Đặt lại tổng giá
    totalItems = 0; // Đặt lại tổng số sản phẩm

    cartItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.header__cart-item-quantity').textContent);
        const price = parseInt(item.querySelector('.header__cart-item-price').textContent.replace('₫', '').replace('.', '').replace(',', ''));
        totalPrice += price * quantity; // Cộng dồn giá
        totalItems += quantity; // Cộng dồn số lượng sản phẩm
    });

    totalPriceEl.textContent = `${totalPrice.toLocaleString()}₫`; // Cập nhật tổng giá
    cartNotice.textContent = totalItems; // Cập nhật số lượng sản phẩm trong giỏ hàng
}

function removeItem(button) {
    const cartItem = button.closest('.header__cart-item');
    const quantity = parseInt(cartItem.querySelector('.header__cart-item-quantity').textContent);
    const price = parseInt(cartItem.querySelector('.header__cart-item-price').textContent.replace('₫', '').replace('.', '').replace(',', ''));
    const itemTotalPrice = price * quantity; // Tính tổng giá của sản phẩm
    totalPrice -= itemTotalPrice; // Giảm tổng giá
    totalItems -= quantity; // Giảm số lượng sản phẩm
    totalPriceEl.textContent = `${totalPrice.toLocaleString()}₫`;
    cartNotice.textContent = totalItems; // Cập nhật số lượng sản phẩm trong giỏ hàng
    cartItem.remove(); // Xóa sản phẩm khỏi giỏ hàng
}
//------------------------------------------------//





