const basePrice = 600;
const addons = {
  "addon-1": { name: "Sleeping Mask", price: 30 },
  "addon-2": { name: "Sheet Mask", price: 80 }
};

function changeQty(id, delta) {
  const input = document.getElementById(`quantity-${id}`);
  let qty = parseInt(input.value) || 0;
  qty = Math.max(0, qty + delta);
  input.value = qty;
  updateTotal();
}

function updateTotal() {
  const qtyMain = parseInt(document.getElementById("quantity-main").value);
  const delivery = parseInt(document.getElementById("delivery").value);
  let total = qtyMain * basePrice;

  for (const key in addons) {
    const qty = parseInt(document.getElementById(`quantity-${key}`).value) || 0;
    total += qty * addons[key].price;
  }

  total += delivery;
  document.getElementById("totalPrice").textContent = `Total: ${total}৳`;
}

function orderNow() {
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const qtyMain = parseInt(document.getElementById("quantity-main").value);
  const delivery = parseInt(document.getElementById("delivery").value);

  if (!name || !address || !phone) {
    alert("Please fill all the fields.");
    return;
  }

  let addonText = "";
  let addonTotal = 0;

  for (const key in addons) {
    const qty = parseInt(document.getElementById(`quantity-${key}`).value);
    if (qty > 0) {
      addonText += `- ${addons[key].name} x${qty} = ${addons[key].price * qty}৳\n`;
      addonTotal += addons[key].price * qty;
    }
  }

  const total = (qtyMain * basePrice) + delivery + addonTotal;

  const msg = `Hello Foreign Mart 🛍️, I want to order:
📦 Product: Extra Pure Gluta White Soap
🧼 Quantity: ${qtyMain}
🚚 Delivery: ${delivery}৳
${addonText ? '➕ Add-ons:\n' + addonText : ''}
💰 Total: ${total}৳

👤 Name: ${name}
📞 Phone: ${phone}
🏠 Address: ${address}
Payment: Cash on Delivery`;

  const url = `https://wa.me/8801719889104?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

updateTotal();
