let offset;
let limit;

for (let index = 1; index < 10; index++) {
    limit = index;
    console.info("\n\n\n************* With limit *************", limit);
    for (let index = 0; index < 10; index++) {
        offset = index;
        console.info("------- Offset is ", offset);
        console.info(`Slice value would be purchases.slice(${offset}, ${limit * (offset + 1)})`);
    }

}