const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

// 1) should add quote to file
// 2) should add quote to file with author
// 3) should log quote
// 4) should not log ALL quotes (don't console.log the array of lines)
// 5) should log quote with author if author given
// 6) should credit quote as "Anonymous" if author is not given
// 7) should add multiple quotes to file
// 8) should retrieve random quotes
// 9) should throw error if no quote is given

program.name("quotes").description("CLI tool for inspiration").version("0.1.0");

program
    .command("getQuote")
    .description("Retrieves a random quote")
    .action(async () => {
        try {
            const quoteData = await fs.readFile(QUOTE_FILE, "utf-8");
            // console.log(JSON.stringify(quoteData));

            let quotes = quoteData
                .split(/\r\n/)
                .filter((line) => line.trim() !== "");

            // console.log(quotes);
            const randomNumber = Math.floor(Math.random() * quotes.length);
            const [quote, author] = quotes[randomNumber].split("|");

            const output = `"${quote}" -${author}`;
            console.log(output);
        } catch (err) {
            console.log(err);
        }
        // TODO: Pull a random quote from the quotes.txt file
        // console log the quote and author
        // You may style the text with chalk as you wish
    });

program
    .command("addQuote <quote> [author]")
    .description("adds a quote to the quote file")
    .action(async (quote, author) => {
        try {
            const newQuote = quote;
            const newAuthor = author || "Anonymous";

            const newLine = `${newQuote}|${newAuthor}\r\n`;
            await fs.appendFile(QUOTE_FILE, newLine, "utf-8");
            console.log("Quote added!");
        } catch (err) {
            console.log(err);
        }
        // TODO: Add the quote and author to the quotes.txt file
        // If no author is provided,
        // save the author as "Anonymous".
        // After the quote/author is saved,
        // alert the user that the quote was added.
        // You may style the text with chalk as you wish
        // HINT: You can store both author and quote on the same line using
        // a separator like pipe | and then using .split() when retrieving
    });

program.parse();
