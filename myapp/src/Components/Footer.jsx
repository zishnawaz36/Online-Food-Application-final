function Footer() {
    return(
        <>
        <div className="footer">
            <div className="download">
                <h2>Download from</h2>
                <img src="https://tse1.mm.bing.net/th?id=OIP.LWK3SISFQXytVPR_WwQ0YgHaCt&pid=Api&P=0&h=180" alt="image"/>
            </div>
            <div className="copyright">
                <h3>Copy Right Issue</h3>
                <h3>copyright@gmail.com</h3>
            </div>
            <div className="deliver">
    <label htmlFor="delivery-options">We deliver:</label>
    <select id="delivery-options">
        <option value="delhi">Delhi</option>
        <option value="mumbai">Mumbai</option>
        <option value="pune">Pune</option>
        <option value="banglore">Bangalore</option>
        <option value="kolkata">Kolkata</option>
        <option value="chennai">Chennai</option>
        <option value="hyderabad">Hyderabad</option>
        <option value="jaipur">Jaipur</option>
        <option value="ahmedabad">Ahmedabad</option>
        <option value="surat">Surat</option>
        <option value="vadodara">Vadodara</option>
        <option value="indore">Indore</option>
        <option value="coimbatore">Coimbatore</option>
        <option value="nashik">Nashik</option>
        <option value="lucknow">Lucknow</option>
    </select>
</div>

            <div className="legal">
                <ul>
                    <li>Legal</li>
                    <li>FAQS</li>
                    <li>Terms and Conditions</li>
                </ul>
            </div>
        </div>
        </>
    )
}
export default Footer;