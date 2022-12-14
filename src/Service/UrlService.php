<?php

namespace App\Service;

use App\Entity\Url;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;

class UrlService
{

    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function addUrl(string $longUrl, string $domain): Url
    {
        $url = new Url();

        $hash = $this->generateHash();
        $link = $_SERVER['HTTP_ORIGIN'] . "/$hash";

        $url->setHash($hash);
        $url->setLink($link);
        $url->setLongUrl($longUrl);
        $url->setDomain($domain);
        $url->setCreatedAt(new \DateTime());

        $this->em->persist($url);
        $this->em->flush();

        return $url;
    }


    public function parseUrl(string $url): string|bool
    {
        $domain = parse_url($url, PHP_URL_HOST);

        if (!$domain) {
            return false;
        }

        if (!filter_var(gethostbyname($domain), FILTER_VALIDATE_IP)) {
            return false;
        }

        return $domain;
    }


    public function generateHash(int $offset = 0, int $length = 8): string
    {
        return substr(md5(uniqid(mt_rand(), true)), $offset, $length);
    }
}
