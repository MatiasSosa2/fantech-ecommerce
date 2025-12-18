from scripts.ml_image_scraper import obtener_imagen_mercadolibre

if __name__ == "__main__":
    try:
        producto = input("Ingresá el nombre del producto: ")
    except (EOFError, KeyboardInterrupt):
        print("\nCancelado.")
        raise SystemExit(1)

    imagen = obtener_imagen_mercadolibre(producto)

    if imagen:
        print("\nImagen encontrada:")
        print(imagen)
    else:
        print("\nNo se pudo encontrar la imagen.")
