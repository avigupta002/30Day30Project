document.addEventListener("DOMContentLoaded", () => {
  const state = {
    robot: { p: 0, r: 0, rounds: 0 },
    friend: { p1: 0, p2: 0, rounds: 0, turn: 1 },
  };

  const $ = (id) => document.getElementById(id);
  const qs = (s) => document.querySelectorAll(s);
  const choices = ["rock", "paper", "scissors"];

  qs(".mode-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      qs(".mode-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      qs(".game-section").forEach((s) => s.classList.remove("active"));
      $(`${btn.dataset.mode}-game`).classList.add("active");
      particles(40);
    })
  );

 
  qs("#robot-game .choice").forEach((el) =>
    el.addEventListener("click", () => {
      if (state.robot.choice) return;
      const player = el.dataset.choice;
      const robot = choices[Math.floor(Math.random() * 3)];

      animate(el, $("player-selection"), player);
      setTimeout(() => {
        animate(
          qs(`#robot-game .choice[data-choice=${robot}]`)[0],
          $("robot-selection"),
          robot
        );
        setTimeout(() => result(player, robot, "robot"), 1000);
      }, 800);
    })
  );

  // ===== FRIEND MODE =====
  qs("#friend-game .choice").forEach((el) =>
    el.addEventListener("click", () => {
      const f = state.friend;
      const c = el.dataset.choice;
      const curSel = f.turn === 1 ? $("player1-selection") : $("player2-selection");
      animate(el, curSel, c);

      if (f.turn === 1) {
        f.p1Choice = c;
        $("friend-result").textContent = "Player 2, your turn!";
        f.turn = 2;
      } else {
        f.p2Choice = c;
        setTimeout(() => result(f.p1Choice, f.p2Choice, "friend"), 800);
        f.turn = 1;
      }
    })
  );

  // Reset
  $("reset-robot").onclick = () => reset("robot");
  $("reset-friend").onclick = () => reset("friend");

  // ===== FUNCTIONS =====
  function animate(el, target, c) {
    el.classList.add("bounce");
    setTimeout(() => el.classList.remove("bounce"), 400);
    setTimeout(() => {
      target.innerHTML = `<i class="fas fa-hand-${c}"></i>`;
      target.style.background = color(c);
    }, 200);
  }

  function color(c) {
    return { rock: "#a29bfe", paper: "#74b9ff", scissors: "#ffeaa7" }[c] || "#fff";
  }

  function result(a, b, mode) {
    const res = a === b ? "draw" : (a === "rock" && b === "scissors") || (a === "paper" && b === "rock") || (a === "scissors" && b === "paper") ? "win" : "lose";
    const disp = mode === "robot" ? $("result") : $("friend-result");
    const s = state[mode];

    if (mode === "robot") s.rounds++;
    if (res === "win") {
      mode === "robot" ? s.p++ : s.p1++;
      disp.textContent = mode === "robot" ? "🎉 You Win!" : "🎉 Player 1 Wins!";
      celebrate();
    } else if (res === "lose") {
      mode === "robot" ? s.r++ : s.p2++;
      disp.textContent = mode === "robot" ? "Robot Wins!" : "Player 2 Wins!";
    } else disp.textContent = "Draw!";

    updateScore(mode);
    setTimeout(() => resetRound(mode), 1800);
  }

  function updateScore(mode) {
    if (mode === "robot") {
      $("player-score").textContent = state.robot.p;
      $("robot-score").textContent = state.robot.r;
    } else {
      $("player1-score").textContent = state.friend.p1;
      $("player2-score").textContent = state.friend.p2;
    }
  }

  function resetRound(mode) {
    if (mode === "robot") {
      $("player-selection").innerHTML = '<i class="fas fa-question"></i>';
      $("robot-selection").innerHTML = '<i class="fas fa-robot"></i>';
    } else {
      $("player1-selection").innerHTML = '<i class="fas fa-user"></i>';
      $("player2-selection").innerHTML = '<i class="fas fa-user"></i>';
      $("friend-result").textContent = "Player 1, your turn!";
    }
  }

  function reset(mode) {
    Object.assign(state[mode], mode === "robot"
      ? { p: 0, r: 0, rounds: 0 }
      : { p1: 0, p2: 0, rounds: 0, turn: 1 });
    updateScore(mode);
    resetRound(mode);
    particles(50);
  }

  // ===== VISUALS =====
  function celebrate() {
    confetti(20);
    particles(30);
  }

  function confetti(n) {
    for (let i = 0; i < n; i++) {
      const d = document.createElement("div");
      d.className = "confetti";
      d.style.left = Math.random() * 100 + "vw";
      d.style.background = `hsl(${Math.random() * 360},100%,70%)`;
      d.style.animationDuration = 3 + Math.random() * 2 + "s";
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 5000);
    }
  }

  function particles(n) {
    for (let i = 0; i < n; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.width = p.style.height = Math.random() * 6 + 2 + "px";
      p.style.background = `hsl(${Math.random() * 360},100%,70%)`;
      p.style.left = Math.random() * innerWidth + "px";
      p.style.top = Math.random() * innerHeight + "px";
      document.body.appendChild(p);
      p.animate(
        [
          { opacity: 1, transform: "translate(0,0)" },
          {
            opacity: 0,
            transform: `translate(${Math.random() * 100 - 50}px, ${
              Math.random() * 100 - 50
            }px)`,
          },
        ],
        { duration: 2000 + Math.random() * 1000 }
      );
      setTimeout(() => p.remove(), 3000);
    }
  }

  // Start initial animation
  setTimeout(() => particles(20), 800);
});
