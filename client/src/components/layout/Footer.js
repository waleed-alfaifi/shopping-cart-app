import React from 'react';

function Footer() {
  return (
    <div className="p-2 bg-dark mt-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-auto">
            <a
              className="text-white"
              href="https://github.com/waleed-alfaifi/shopping-cart-app"
              target="blank"
            >
              GitHub
            </a>
          </div>
          <div className="col-sm-auto">
            <small className="text-white">
              <em className="text-info">
                Favicon from{' '}
                <a
                  className=" text-white"
                  href="https://icons8.com"
                  target="blank"
                >
                  icons8.com
                </a>
              </em>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
