#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["G4L.UserManagement.API/G4L.UserManagement.API.csproj", "G4L.UserManagement.API/"]
COPY ["G4L.UserManagement.BL/G4L.UserManagement.BL.csproj", "G4L.UserManagement.BL/"]
COPY ["G4L.UserManagement.Shared/G4L.UserManagement.Shared.csproj", "G4L.UserManagement.Shared/"]
COPY ["G4L.UserManagement.DA/G4L.UserManagement.DA.csproj", "G4L.UserManagement.DA/"]
RUN dotnet restore "G4L.UserManagement.API/G4L.UserManagement.API.csproj"
COPY . .
WORKDIR "/src/G4L.UserManagement.API"
RUN dotnet build "G4L.UserManagement.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "G4L.UserManagement.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "G4L.UserManagement.API.dll"]