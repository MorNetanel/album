class Config{

}

class DevConfig extends Config{
    public photographerUrl = "http://localhost:3030/photographer/";
    public clientUrl = "http://localhost:3030/client/";
    public guestUrl = "http://localhost:3030/guest/";
    public authUrl = "http://localhost:3030/auth/";
}

class TestingConfig extends Config{
    public photographerUrl = "http://localhost:3030/photographer/";
    public clientUrl = "http://localhost:3030/client/";
    public guestUrl = "http://localhost:3030/guest/";
    public authUrl = "http://localhost:3030/auth/";
}

class ProductionConfig extends Config{
    public photographerUrl = "http://localhost:8080/photographer/";
    public clientUrl = "http://localhost:8080/client/";
    public guestUrl = "http://localhost:8080/guest/";
    public authUrl = "http://localhost:8080/auth/";
}

const appConfig = process.env.NODE_ENV === "development" ? new DevConfig() : 
    process.env.NODE_ENV === "test" ? new TestingConfig() : new ProductionConfig();

export default appConfig; 

