/******************************************************************************
 *                          Fetch and display products
 ******************************************************************************/

displayproducts();


function displayproducts() {
    httpGet('/api/products/all')
        .then(response => response.json())
        .then((response) => {
            var allproducts = response.products;
            // Empty the anchor
            var allproductsAnchor = document.getElementById('all-products-anchor');
            allproductsAnchor.innerHTML = '';
            // Append products to anchor
            allproducts.bundle.forEach((product) => {
                allproductsAnchor.innerHTML += getproductDisplayEle(product);
            });
        });
};


function getproductDisplayEle(product) {
    return `<div class="product-display-ele">

        <div class="normal-view">
            <div>Id: ${product.id}</div>
            <div>Name: ${product.name}</div>
            <div>Price: ${product.price}</div>
            <div>Quantity: ${product.quantity}</div>
            <button class="edit-product-btn" data-product-id="${product.id}">
                Edit
            </button>
            <button class="delete-product-btn" data-product-id="${product.id}">
                Delete
            </button>
        </div>
        
        <div class="edit-view">
            <div>
                Name: <input class="name-edit-input" value="${product.name}">
            </div>
            <div>
                Price: <input class="name-edit-input" value="${product.price}">
            </div>
            <div>
                Quantity: <input class="name-edit-input" value="${product.quantity}">
            </div>
            <button class="submit-edit-btn" data-product-id="${product.id}">
                Submit
            </button>
            <button class="cancel-edit-btn" data-product-id="${product.id}">
                Cancel
            </button>
        </div>
    </div>`;
}


/******************************************************************************
 *                        Add, Edit, and Delete products
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#add-product-btn')) {
        addproduct();
    } else if (ele.matches('.edit-product-btn')) {
        showEditView(ele.parentNode.parentNode);
    } else if (ele.matches('.cancel-edit-btn')) {
        cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.submit-edit-btn')) {
        submitEdit(ele);
    } else if (ele.matches('.delete-product-btn')) {
        deleteproduct(ele);
    }
}, false)


function addproduct() {
    var IdInput = document.getElementById('id-input');
    var NameInput = document.getElementById('name-input');
    var PriceInput = document.getElementById('price-input');
    var QuantityInput = document.getElementById('quantity-input');
    var data = {
        product: {
            id: IdInput.value,
            name: NameInput.value,
            price: PriceInput.value,
            quantity: QuantityInput.value
        },
    };
    httpPost('/api/products/add', data)
        .then(() => {
            displayproducts();
        })
}


function showEditView(productEle) {
    var normalView = productEle.getElementsByClassName('normal-view')[0];
    var editView = productEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'none';
    editView.style.display = 'block';
}


function cancelEdit(productEle) {
    var normalView = productEle.getElementsByClassName('normal-view')[0];
    var editView = productEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'block';
    editView.style.display = 'none';
}


function submitEdit(ele) {
    var productEle = ele.parentNode.parentNode;
    var NameInput = productEle.getElementsByClassName('name-edit-input')[0];
    var PriceInput = productEle.getElementsByClassName('price-edit-input')[0];
    var QuantityInput = productEle.getElementsByClassName('quantity-edit-input')[0];
    var id = ele.getAttribute('data-product-id');
    var data = {
        product: {
            name: NameInput.value,
            price: PriceInput.value,
            quantity: QuantityInput.value,
            id: id
        }
    };
	httpPut('/api/products/update', data)
        .then(() => {
            displayproducts();
        })
}


function deleteproduct(ele) {
    var id = ele.getAttribute('data-product-id');
	httpDelete('/api/products/delete/' + id)
        .then(() => {
            displayproducts();
        })
}


function httpGet(path) {
    return fetch(path, getOptions('GET'))
}


function httpPost(path, data) {
    return fetch(path, getOptions('POST', data));
}


function httpPut(path, data) {
    return fetch(path, getOptions('PUT', data));
}


function httpDelete(path) {
    return fetch(path, getOptions('DELETE'));
}


function getOptions(verb, data) {
    var options = {
        dataType: 'json',
        method: verb,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return options;
}

