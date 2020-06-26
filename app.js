(async function launch() {
    

    let database = await fetch("https://character-database.becode.xyz/characters");
    let res = await database.json();
    console.table(res);
})()
