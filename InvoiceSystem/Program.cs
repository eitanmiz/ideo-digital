// *********
// Main program serves Rest api calls for db manipulations (add/update/select).
// *********
var builder = WebApplication.CreateBuilder(args);

// base swagger
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// base builder config.
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// enable cors-origin for application on network.
app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
app.UseHttpsRedirection();


app.UseAuthorization();

app.MapControllers();

// run the fast-api
app.Run();
