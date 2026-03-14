using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using BlazorTodo.Pages;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<TodoMaster>("#blazor-todo-host");
builder.RootComponents.Add<HeadOutlet>("head::after");

await builder.Build().RunAsync();
