// Footer year
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Waitlist forms — front-end only for now.
// Swap the body of handleSubmit for a real request once you wire up
// a backend or a service like Formspree / ConvertKit / Supabase.
const forms = document.querySelectorAll('[data-waitlist-form]');

forms.forEach((form) => {
  const note = form.parentElement.querySelector('[data-waitlist-note]');
  const defaultNote = note ? note.textContent : '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button[type="submit"]');
    const email = input.value.trim();

    if (!email) return;

    button.disabled = true;
    const originalLabel = button.textContent;
    button.textContent = 'Joining…';

    try {
      // TODO: replace with a real endpoint, e.g.
      // await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 500));

      form.reset();
      button.textContent = "You're on the list";
      if (note) note.textContent = `Confirmed — we'll email ${email} when we launch.`;
    } catch (err) {
      button.textContent = 'Try again';
    } finally {
      setTimeout(() => {
        button.disabled = false;
        button.textContent = originalLabel;
        if (note) note.textContent = defaultNote;
      }, 3500);
    }
  });
});
