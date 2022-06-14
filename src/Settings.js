function Settings(){
    const URL = "vincehub.dk/tomcat/exam/api/"

    function getUrl() {
        return URL;
    }

    return{
        getUrl
    }
}
const settings = Settings();
export default settings;