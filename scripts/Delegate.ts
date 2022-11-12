async function delegate() {
    console.log("here")
}

delegate().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});