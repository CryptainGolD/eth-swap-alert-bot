export async function Pagination(
  items: Array<{ label: string; callbackData: string }>,
  itemsPerPage = 10,
  buttonsPerRow = 2,
) {
  let currentPage = 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const generateItemButtons = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = items.slice(startIndex, endIndex);

    const itemButtons: any[] = [];
    for (let i = 0; i < pageItems.length; i += buttonsPerRow) {
      const row = pageItems.slice(i, i + buttonsPerRow).map((item) => ({
        text: item.label,
        callback_data: item.callbackData,
      }));
      itemButtons.push(row);
    }

    return itemButtons;
  };

  const generatePaginationButtons = (page: number) => {
    const paginationButtons: any[] = [];
    const showFirstButton = page > 3;
    const showLastButton = page < totalPages - 2;

    if (showFirstButton) {
      paginationButtons.push({ text: "<<", callback_data: "first_page" });
    } else {
      paginationButtons.push({ text: " ", callback_data: "nowork" });
    }

    for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
      const buttonLabel = i === page ? `[ ${i} ]` : `${i}`;
      paginationButtons.push({ text: buttonLabel, callback_data: `page_${i}` });
    }

    if (showLastButton) {
      paginationButtons.push({ text: ">>", callback_data: "last_page" });
    } else {
      paginationButtons.push({ text: " ", callback_data: "nowork" });
    }

    return paginationButtons;
  };

  const startPagination = async (ctx: any) => {
    currentPage = 1;
    await ctx.reply("Select an item:", {
      reply_markup: {
        inline_keyboard: [...generateItemButtons(currentPage), generatePaginationButtons(currentPage)],
      },
    });
  };

  const handlePageChange = async (ctx: any, page: number) => {
    currentPage = Math.min(Math.max(page, 1), totalPages);
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [...generateItemButtons(currentPage), generatePaginationButtons(currentPage)],
    });
    await ctx.answerCbQuery();
  };

  return {
    startPagination,
    handlePageChange,
    getCurrentPage: () => currentPage,
    getTotalPages: () => totalPages,
  };
}
