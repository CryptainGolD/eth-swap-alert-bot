export async function NumberPad(defaultMessage: string, limit: number) {
  let currentInput: string = "0";

  const decimal_keyboard = [
    [
      { text: "1", callback_data: "1" },
      { text: "2", callback_data: "2" },
      { text: "3", callback_data: "3" },
    ],
    [
      { text: "4", callback_data: "4" },
      { text: "5", callback_data: "5" },
      { text: "6", callback_data: "6" },
    ],
    [
      { text: "7", callback_data: "7" },
      { text: "8", callback_data: "8" },
      { text: "9", callback_data: "9" },
    ],
    [
      { text: "Reset", callback_data: "reset" },
      { text: "0", callback_data: "0" },
      { text: ".", callback_data: "." },
    ],
    [{ text: "Ok", callback_data: "ok" }],
  ];
  const normal_keyboard = [
    [
      { text: "1", callback_data: "1" },
      { text: "2", callback_data: "2" },
      { text: "3", callback_data: "3" },
    ],
    [
      { text: "4", callback_data: "4" },
      { text: "5", callback_data: "5" },
      { text: "6", callback_data: "6" },
    ],
    [
      { text: "7", callback_data: "7" },
      { text: "8", callback_data: "8" },
      { text: "9", callback_data: "9" },
    ],
    [
      { text: "Reset", callback_data: "reset" },
      { text: "0", callback_data: "0" },
      { text: " ", callback_data: "nowork" },
    ],
    [{ text: "Ok", callback_data: "ok" }],
  ];

  const normalizeInput = (input: string): string => {
    if (input.startsWith("0") && !input.startsWith("0.") && input.length > 1) {
      input = input.replace(/^0+/, ""); // Remove leading zeros unless it's a decimal
    }
    if (input === "") input = "0"; // Reset to "0" if input is empty
    return input;
  };

  const exceedsLimit = (input: string): boolean => {
    const value = parseFloat(input);
    return value > limit;
  };

  const validateNumberFormat = (input: string): string => {
    if (input.endsWith(".")) {
      return input.slice(0, -1);
    }
    return input;
  };

  const startNumberInput = async (ctx: any, hasDecimals: boolean) => {
    currentInput = "0"; // Reset current input
    await ctx.replyWithHTML(defaultMessage, {
      reply_markup: {
        parse_mode: "HTML",
        inline_keyboard: hasDecimals ? decimal_keyboard : normal_keyboard,
      },
    });
  };

  const handleNumberButtonClick = async (ctx: any, hasDecimals: boolean) => {
    const number = ctx.callbackQuery.data;

    // Prevent multiple dots in the input
    if (number === "." && currentInput.includes(".")) {
      await ctx.answerCbQuery("Invalid input: only one decimal point allowed.");
      return;
    }

    let newInput = currentInput;

    // Append valid number to currentInput
    if (currentInput === "0" && (number === "0" || number === "")) {
      newInput = "0";
    } else if (currentInput === "0" && number !== ".") {
      newInput = number;
    } else {
      newInput += number;
    }

    newInput = normalizeInput(newInput);

    if (exceedsLimit(newInput)) {
      await ctx.answerCbQuery(`Input cannot exceed ${limit}.`);
      return;
    }

    // Only update the message if the input has changed
    if (newInput !== currentInput) {
      currentInput = newInput;
      await ctx.editMessageText(`${defaultMessage} <code>${currentInput}</code>`, {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: hasDecimals ? decimal_keyboard : normal_keyboard,
        },
      });
    } else {
      await ctx.answerCbQuery("No change in input.");
    }
  };

  const handleOkButtonClick = async (ctx: any) => {
    const validatedInput = validateNumberFormat(currentInput);

    if (validatedInput) {
      await ctx.editMessageText(`${defaultMessage} <code>${validatedInput}</code>`, { parse_mode: "HTML" });
      currentInput = "0";
      return validatedInput;
    } else {
      await ctx.reply("No input provided.");
    }
  };

  const handleResetButtonClick = async (ctx: any, hasDecimals: boolean) => {
    currentInput = "0"; // Reset the input to "0"
    await ctx.editMessageText(`${defaultMessage} <code>${currentInput}</code>`, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: hasDecimals ? decimal_keyboard : normal_keyboard,
      },
    });
  };

  // Return public methods to handle number input functionality
  return {
    startNumberInput,
    handleNumberButtonClick,
    handleOkButtonClick,
    handleResetButtonClick,
  };
}
