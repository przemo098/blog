using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using BlazorTodo.Pages;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<TodoMaster>("#blazor-todo-host");

// UWAGA: nie rejestrujemy HeadOutlet ("head::after"). Blazor przejmuje wtedy <head>
// i wywołuje getAndRemoveExistingTitle(), które usuwa <title> wstawiony przez Reacta
// (Next.js metadata = hoistable resource). Przy nawigacji client-side React robi
// unmountHoistable(title) -> instance.parentNode === null -> crash całego hosta.
// Ten micro FE nie używa <PageTitle>/<HeadContent>, więc HeadOutlet jest zbędny.

await builder.Build().RunAsync();
