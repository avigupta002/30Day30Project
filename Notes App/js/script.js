const container = document.getElementById("noteContainer");
    const addBtn = document.getElementById("addBtn");
    const title = document.getElementById("title");
    const content = document.getElementById("content");

    function getNotes() {
      let titles = JSON.parse(localStorage.getItem("title")) || [];
      let contents = JSON.parse(localStorage.getItem("content")) || [];
      return { titles, contents };
    }

    function saveNotes(titles, contents) {
      localStorage.setItem("title", JSON.stringify(titles));
      localStorage.setItem("content", JSON.stringify(contents));
    }

    function displayNotes() {
      const { titles, contents } = getNotes();
      let html = "";

      contents.forEach((note, i) => {
        html += `
          <div class="note">
            <h5 class="noteTitle">${titles[i]}</h5>
            <p class="noteContent">${note}</p>
            <button class="deleteBtn" value="${i}">Delete</button>
            <button class="editBtn" value="${i}">Edit</button>
          </div>`;
      });

      container.innerHTML = html || `<h4>No notes yet. Click <b>Add Note</b> to create one.</h4>`;
      attachEventListeners();
    }

    function attachEventListeners() {
      const deleteBtns = document.querySelectorAll(".deleteBtn");
      const editBtns = document.querySelectorAll(".editBtn");

      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!confirm("Are you sure you want to delete this note?")) return;
          const { titles, contents } = getNotes();
          const index = btn.value;
          titles.splice(index, 1);
          contents.splice(index, 1);
          saveNotes(titles, contents);
          displayNotes();
        });
      });

      editBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!confirm("Edit this note?")) return;
          const { titles, contents } = getNotes();
          const index = btn.value;

          // Prefill form with selected note
          title.value = titles[index];
          content.value = contents[index];

          // Remove current note
          titles.splice(index, 1);
          contents.splice(index, 1);
          saveNotes(titles, contents);
          displayNotes();
        });
      });
    }

    addBtn.addEventListener("click", () => {
      let { titles, contents } = getNotes();

      if (title.value.trim() === "" || content.value.trim() === "") {
        alert("Title and Content cannot be empty.");
        return;
      }

      titles.unshift(title.value.trim());
      contents.unshift(content.value.trim());
      saveNotes(titles, contents);

      title.value = "";
      content.value = "";

      displayNotes();
    });

    const searchBox = document.getElementById("searchBox");
    searchBox.addEventListener("input", () => {
      let divs = container.children;
      Array.from(divs).forEach((div) => {
        let noteTitle = div.querySelector(".noteTitle").textContent.toLowerCase();
        let noteContent = div.querySelector(".noteContent").textContent.toLowerCase();
        const query = searchBox.value.toLowerCase();
        div.style.display =
          noteTitle.includes(query) || noteContent.includes(query)
            ? "block"
            : "none";
      });
    });

    displayNotes();