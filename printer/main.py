from PIL import Image
import segno

BASE_URL = "http://localhost:4173/qr/"
TICKET_FOLDER = "tickets"
QR_FOLDER = "qr"
QR_SIZE = 200


def generate_qrs():
    with open("codes.txt", "r", encoding="utf-8") as f:
        codes = f.read().splitlines()

        for code in codes:
            qr = segno.make(f"{BASE_URL}{code}")
            qr.save(f"{QR_FOLDER}/{code}.png", scale=QR_SIZE)


if __name__ == "__main__":
    # generate_qrs()
    # print("QR codes generated")
    ...
