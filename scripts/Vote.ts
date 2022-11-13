async function vote() {

}

vote().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});