fetch('products.json')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('tour-container');
                
                data.products.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <div class="card-body">
                            <h2 class="card-title">${product.title}</h2>
                            <p class="card-text">price: ${product.price}$</p>
                            <p class="card-text">${product.des}</p>
                            <a href="Asia" class="card-button">Just book & go</a>
                        </div>
                    `;
                    
                    container.appendChild(card);
                });
            })
            .catch(error => console.error('Error loading products:', error));